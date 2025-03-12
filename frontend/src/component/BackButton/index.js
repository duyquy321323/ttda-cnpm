import { styled } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackButtonStyled = styled('div')({
    fontFamily: "var(--fontvietnam)",
    fontSize: "30px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    color: 'var(--violetcolor)',
    textTransform: 'none',
    display: 'flex',
    alignItems: 'center',
});

const BackButton = (props) => {

    const { title, navlink } = props;
    const navigate = useNavigate();

    return(
        <>
            <BackButtonStyled>
                <IconButton sx={{color: 'var(--violetcolor)'}} onClick={() => navigate(navlink)}>
                    <IoArrowBackCircle size={48} />
                </IconButton>
                {title}
            </BackButtonStyled>
        </>
    );
}

export default BackButton;