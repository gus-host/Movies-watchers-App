function Button({
  bg,
  color,
  border,
  fontSize,
  marginRight,
  onClick,
  children,
}) {
  return (
    <Button
      onClick={onClick}
      style={{
        backgroundColor: `${bg ? bg : "#0f0f0f"}`,
        color: `${color ? color : "#fff"}`,
        border: `${border ? border : "none"}`,
        padding: "7px 14px",
        borderRadius: "5px",
        fontSize: `${fontSize ? fontSize : "12px"}`,
        fontWeight: "600",
        marginRight: `${marginRight ? marginRight : ""}`,
        cursor: "pointer",
      }}
    >
      {children}
    </Button>
  );
}

export default Button;
