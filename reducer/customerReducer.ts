import { UserInfo } from "@/app/(root)/analytics/[customerID]/page";

interface CustomerState {
  loading: boolean;
  data: any[];
  error: boolean;
}

interface CustomerAction {
  type: string;
  payload?: any;
  searchValue?: string
}

export const INITIAL_STATE: CustomerState = {
  loading: false,
  data: [],
  error: false,
};

export const customerReducer = (
  state: CustomerState,
  action: CustomerAction
) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        loading: true,
        error: false,
        data: [],
      };
    case "FETCH_SUCCESS":
      return {
        loading: false,
        error: false,
        data: action.payload,
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        error: true,
        data: [],
      };
    case "EDIT_SUCCESS":
      const updatedData = state.data.map((customer: UserInfo) =>
        customer._id === action.payload._id
          ? { ...customer, ...action.payload }
          : customer
      );
      return {
        ...state,
        loading: false,
        error: false,
        data: updatedData,
      };
    case "DELETE_SUCCESS":
      const updatedDataAfterDelete = state.data.filter(
        (customer: UserInfo) => customer._id !== action.payload._id
      )
      return {
        ...state,
        loading: false,
        error: false,
        data: updatedDataAfterDelete
      }
    case "SEARCH":
      return {
        ...state,
        loading: true,
        error: false,
      }
    case "SEARCH_SUCCESS":
      return {
        loading: false,
        error: false,
        data: action.payload
      }
    case "SEARCH_ERROR":
      return {
        loading: false,
        error: true,
        data: []
      }
    default:
      return state;
  }
};
