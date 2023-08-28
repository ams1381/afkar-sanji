export const handleInputWidth = (InputRef,NameValue) => {
    if (InputRef.current) {
      const font = '16px IRANSans'; // Set the desired font and size
      const minWidth = calculateTextWidth(NameValue, font);
      InputRef.current.style.width = `${minWidth}px`;
    }
  };
export const calculateTextWidth = (text, font) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  };