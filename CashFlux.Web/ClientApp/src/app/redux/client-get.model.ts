// Used to update a profile in state once a response is obtained.
export interface ClientGetModel<TGetModel> {
  model: TGetModel;
  reduxId: string;
}
