import { ButtonLoad } from './Button.styled';
import { useContext } from 'react';
import { AppContext } from 'components/App/App';

const Button = () => {
  const { loadMore } = useContext(AppContext);

  return (
    <div>
      <ButtonLoad type="button" onClick={loadMore}>
        Load more
      </ButtonLoad>
    </div>
  );
};


export default Button;
