const Crypto = () => {
  return (
    <div className="crypto">
      <h1 className="crypto__title">Crypto</h1>
      <div className="crpyto__inputs">
        <input type="number" placeholder="amount" className="crypto__input" />
        <input
          type="list"
          placeholder="from"
          list="crypto__list-1"
          className="crypto__list"
        />
        <datalist id="crypto__list-1">
          <option value="USD"></option>
        </datalist>
        <input
          type="list"
          placeholder="to"
          list="crypto__list-2"
          className="crypto__list"
        />
        <datalist id="crypto__list-2">
          <option value="PLN"></option>
        </datalist>
        <button className="crypto__btn">Calculate</button>
      </div>
    </div>
  )
}
export default Crypto
