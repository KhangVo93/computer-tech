import Logo from '../../assets/logo/logo.png'
import { Tooltip } from '@mui/material'
function LogoComponent() {
    return (
        <>
            <Tooltip title="Trang chủ" placement="bottom">
                <img src={Logo} style={{ maxWidth: 300 }} alt='logo' />
            </Tooltip>
        </>
    );
}
export default LogoComponent