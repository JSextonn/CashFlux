import { Injectable } from "@angular/core";
import { Flux } from "./reducers/flux.reducer";
import { FluxProfile } from "./reducers/profile.reducer";
import { FluxSource } from "./reducers/source.reducer";
import { UserGetModel } from "../services/user.service";
import { currentIdOrNext } from "./id.tools";
import { ProfileGetModel } from "../services/profile.service";
import { SourceGetModel } from "../services/source.service";

export interface NormalizedResources {
  personalInfo: PersonalInfo;
  fluxes: Flux[];
  profiles: FluxProfile[];
  sources: FluxSource[];
}

export interface PersonalInfo {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  timeCreated: Date;
}

@Injectable()
export class ResourceMapper {
  private profileIds: string[] = [];
  private sourceIds: string[] = [];
  private fluxIds: string[] = [];

  // Kept global to the entire class so that the fluxes are able to be normalized
  private resources: NormalizedResources;

  public constructor() { }

  mapToNormalizedData(data: UserGetModel): NormalizedResources {
    this.prepareResources(data);
    return this.resources;
  }

  private prepareResources(data: UserGetModel) {
    this.initializeResources();
    this.preparePersonalInfo(data);
    this.prepareProfiles(data.profiles);
    this.prepareSources(data.sources);
    this.prepareFluxes(data.profiles);
  }

  private initializeResources() {
    this.resources = {
      personalInfo: undefined,
      profiles: undefined,
      sources: undefined,
      fluxes: undefined
    }
  }

  private preparePersonalInfo(data: UserGetModel) {
    this.resources.personalInfo = {
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: data.fullName,
      timeCreated: data.timeCreated
    }
  }

  private prepareProfiles(profiles: ProfileGetModel[]) {
    const preparedProfiles: FluxProfile[] = profiles.map(profile => {
      return {
        cloudId: profile.id,
        name: profile.name,
        timeCreated: profile.timeCreated
      };
    });

    preparedProfiles.map(profile => {
      profile.id = currentIdOrNext(profile.id, this.profileIds);
      // Make sure to add the newly taken id to the list.
      this.profileIds.push(profile.id);
    });
    this.resources.profiles = preparedProfiles;
  }

  private prepareSources(sources: SourceGetModel[]) {
    const preparedSources: FluxSource[] = sources.map(source => {
      return {
        cloudId: source.id,
        name: source.name,
        category: source.category,
        timeCreated: source.timeCreated
      };
    });

    preparedSources.map(source => {
      source.id = currentIdOrNext(source.id, this.sourceIds);
      // Make sure to add the newly taken id to the list.
      this.sourceIds.push(source.id);
    });
    this.resources.sources = preparedSources;
  }

  private prepareFluxes(profiles: ProfileGetModel[]) {
    const preparedFluxes: Flux[] = [];

    this.profileIds.forEach((profileId, i) => {
      for (let j = 0; j < profiles[i].fluxes.length; j++) {
        const flux = profiles[i].fluxes[j];
        preparedFluxes.push({
          cloudId: flux.id,
          amount: flux.amount,
          sourceId: this.findSourceByCloudId(flux.source.id).id,
          profileId: profileId,
          timeCreated: new Date(flux.timeCreated)
        });
      }
    });

    preparedFluxes.map(flux => {
      flux.id = currentIdOrNext(flux.id, this.fluxIds);
      // Make sure to add the newly taken id to the list.
      this.fluxIds.push(flux.id);
    });

    this.resources.fluxes = preparedFluxes;
  }

  private findSourceByCloudId(id: string): FluxSource {
    return this.resources.sources.filter(source => source.cloudId === id)[0];
  }
}
