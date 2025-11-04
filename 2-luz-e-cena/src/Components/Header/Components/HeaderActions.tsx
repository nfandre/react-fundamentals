import Button from '../../Button'
import { HiOutlineShoppingCart, HiOutlineUser } from 'react-icons/hi'

const HeaderActions = () => {
  return (
    <div>
        <Button variant='icon'>
            <HiOutlineShoppingCart></HiOutlineShoppingCart>
        </Button>
        <Button variant='icon'>
            <HiOutlineUser></HiOutlineUser>
        </Button>
    </div>
  )
}

export default HeaderActions