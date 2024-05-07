import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Header from './shared-components/Header';
import Content from './shared-components/Content'

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
   
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

function UserPage(props) {


  return (
    <Root
      header={<Header />}
      content={<Content {...props}/>}
      scroll="page"
    />
  );
}

export default UserPage;
