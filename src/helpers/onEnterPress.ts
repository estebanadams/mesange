const onEnterPress = (e: any, func: () => void) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
};

export default onEnterPress;
