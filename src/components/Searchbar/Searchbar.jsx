import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import { SearchBarHeader } from './Searchbar.styled';
import { SearchFormButton } from 'components/SearchFormButton/SearchFormButton';
import * as yup from 'yup';

const schema = yup.object().shape({
  query: yup.string().min(3).required(),
});

const initial = {
  query: '',
};

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    const { query } = values;
    onSubmit({ query, page: 1 });
    resetForm();
  };
  return (
    <SearchBarHeader className="searchbar">
      <Formik
        initialValues={initial}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <SearchForm className="form">
          <SearchFormButton type="submit" className="button" />
          <SearchFormInput
            className="input"
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </SearchBarHeader>
  );
};

const SearchForm = styled(Form)`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
`;
const SearchFormInput = styled(Field)`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 4px;
  padding-right: 4px;
  ::placeholder {
    font: inherit;
    font-size: 18px;
  }
`;
// export class Searchbar extends Component {
//   state = {
//     query: '',
//     page: null,
//     images: [],
//   };

//   onChange = e => {
//     this.setState({ query: e.currentTarget.value, page: 1 });
//   };

//   onSubmit = e => {
//     e.preventDefault();
//     this.props.onSubmit(this.state.query.toLowerCase().trim(), this.state.page);
//     this.setState({ query: '' });
//   };

//   render() {
//     const { query } = this.state;
//     return (
//       <SearchbarHeader className="searchbar">
//         <SearchForm className="form" onSubmit={this.onSubmit}>
//           <SearchFormButton type="submit" className="button" />
//           <SearchFormInput
//             className="input"
//             value={query}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onChange={this.onChange}
//           />
//         </SearchForm>
//       </SearchbarHeader>
//     );
//   }
// }
