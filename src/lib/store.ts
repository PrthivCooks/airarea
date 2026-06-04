import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingState {
  selectedService: string;
  selectedStylist: string;
  clientName: string;
  selectedDate: string;
  selectedTime: string;
}

const initialState: BookingState = {
  selectedService: "",
  selectedStylist: "",
  clientName: "",
  selectedDate: "",
  selectedTime: "",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setSelectedService: (state, action: PayloadAction<string>) => {
      state.selectedService = action.payload;
    },
    setSelectedStylist: (state, action: PayloadAction<string>) => {
      state.selectedStylist = action.payload;
    },
    setClientName: (state, action: PayloadAction<string>) => {
      state.clientName = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setSelectedTime: (state, action: PayloadAction<string>) => {
      state.selectedTime = action.payload;
    },
    resetBooking: (state) => {
      state.selectedService = "";
      state.selectedStylist = "";
      state.clientName = "";
      state.selectedDate = "";
      state.selectedTime = "";
    },
  },
});

export const {
  setSelectedService,
  setSelectedStylist,
  setClientName,
  setSelectedDate,
  setSelectedTime,
  resetBooking,
} = bookingSlice.actions;

export const store = configureStore({
  reducer: {
    booking: bookingSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
