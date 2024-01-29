export default function ErrorMessage({ errors }) {
  return errors &&
    <div className="alert">
      { Object.keys(errors).map(key => {
        return <p key={ key }>{ errors[key][0] }</p>;
      })}
    </div>;
};