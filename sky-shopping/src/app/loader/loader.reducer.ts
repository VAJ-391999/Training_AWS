export enum LoaderAction {
  START = 'start',
  STOP = 'stop',
}

export interface ActionType {
  type: string;
}

export function reducer(state = { isOn: false }, action: ActionType) {
  switch (action.type) {
    case LoaderAction.START: {
      return {
        isOn: true,
      };
    }

    case LoaderAction.STOP: {
      return {
        isOn: false,
      };
    }

    default:
      return state;
  }
}
