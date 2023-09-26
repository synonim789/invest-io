const Shares = () => {
  return (
    <div className="stock">
      <h1 className="stock__title">Stock</h1>
      <div className="stock__inputs">
        <input
          type="number"
          className="stock__inputs"
          placeholder="shares amount"
        />
        <input
          type="list"
          list="stock__list-1"
          className="stock__list"
          placeholder="company"
        />
        <datalist id="stock__list-1">
          <option value="Apple"></option>
        </datalist>
        <button className="stock__btn">calculate</button>
      </div>
    </div>
  )
}
export default Shares
