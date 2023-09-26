const Currencies = () => {
  return (
    <div className="currrencies">
      <h1 className="currenices__title">Currencies</h1>
      <div className="currencies__inputs">
        <input
          type="number"
          className="currencies__input"
          placeholder="amount"
        />
        <input
          type="list"
          className="currencies__list"
          list="currencies__list-1"
          placeholder="from"
        />
        <datalist id="currencies__list-1">
          <option value="USD"></option>
        </datalist>
        <input
          type="list"
          className="currencies__list"
          placeholder="to"
          list="currencies__list-2"
        />
        <datalist id="currencies__list-2">
          <option value="PLN"></option>
        </datalist>
        <button className="currencies__btn">Calculate</button>
      </div>
    </div>
  )
}
export default Currencies
