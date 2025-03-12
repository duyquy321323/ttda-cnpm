import { Button, styled } from "@mui/material";

const ButtonStyled = styled(Button)({
    fontFamily: "var(--fontvietnam)",
    fontSize: "30px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    borderRadius: "50px",
    backgroundColor: "#00AEEF",
    textAlign: "center",
    padding: "21px 0",
    textTransform: 'none',
    color: "#FFFFFF",
    "&:hover": {
        backgroundColor: "rgb(3, 169, 230)",
    }
});

const SubmitFormButton = (props) => {

    const { title } = props;

    return(
        <ButtonStyled variant="contained">{title}</ButtonStyled>
    );
}

export default SubmitFormButton;