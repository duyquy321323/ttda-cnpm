import { Button, styled } from "@mui/material";

const ButtonStyled = styled(Button)({
    fontFamily: "var(--fontvietnam)",
    fontSize: "30px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "1.5",
    borderRadius: "50px",
    backgroundColor: "var(--violetcolor)",
    textAlign: "center",
    padding: "21px 0",
    textTransform: 'none',
    color: "#FFFFFF",
    "&:hover": {
        backgroundColor: "rgb(3, 169, 230)",
    }
});

const SubmitFormButton = (props) => {

    const { title, type } = props;

    return (
        <ButtonStyled variant="contained" type={type}>{title}</ButtonStyled>
    );
}

export default SubmitFormButton;