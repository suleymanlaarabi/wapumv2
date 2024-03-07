/*
::-webkit-scrollbar-track {
  border-radius: 8px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ffffff15;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  border-radius: 10px;
}


*/

export const cssDefault = {
  scrollbar: {
    default: {
      "&::-webkit-scrollbar-track": {
        borderRadius: 8,
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: 10,
        backgroundColor: "#ffffff15",
      },
      "&::-webkit-scrollbar": {
        width: 8,
        height: 8,
        borderRadius: 10,
      },
    },
    conversation: (color: string) => ({
      "&::-webkit-scrollbar": {
        width: "16px",
        borderRadius: "8px",
        backgroundColor: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: color,
      },
    }),
  },
};
