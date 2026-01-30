import { Book } from "../../store/reducers/books";
import BookItem from "../BookItem";

const BooksList = ({ items }: { items: Book[] }) => (
    <>
        {items.map(item => (
            <BookItem book={item} key={item.id} />
        ))}
    </>
)

export default BooksList