import './button.css';

function Mybutton({textColor, children, onClick }) {
  return (
    <button style={{color:textColor}} className="buttons" onClick={onClick}>
      {children}
    </button>
  );
}
export default Mybutton;
