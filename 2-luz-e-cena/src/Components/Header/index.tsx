import HeaderList from './Components/HeaderList';
import HeaderListItem from './Components/HeaderListItem';
import Logo from '../Logo'
import HeaderLinks from './Components/HeaderLinks';
import HeaderFormFilters from './Components/HeaderFormFilters';
import HeaderActions from './Components/HeaderActions';

const Header = () => {
  return (
    <header>
        <HeaderList>
            <HeaderListItem>
                <Logo src="/logo.png"></Logo>
            </HeaderListItem>
            <HeaderListItem>
                <HeaderLinks/>
            </HeaderListItem>
            <HeaderListItem>
                <HeaderFormFilters/>
            </HeaderListItem>
            <HeaderListItem>
                <HeaderActions/>
            </HeaderListItem>
        </HeaderList>
    </header>
  )
}

export default Header