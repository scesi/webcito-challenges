import { DatePricesCard as plansData } from "../../data/date-prices-card";

import IconCheck from "../../assets/module-prices/check-circle.svg";
import IconCheckWhite from "../../assets/module-prices/check-circle-white.svg";

import "./view-mobile.css";

export const ViewPlans = () => {
  return (
    <main className="plans">
      <header className="plans__header">
        <h1>Planes y precios</h1>
        <p>Elige el plan que más te convenga y comienza a aprender hoy mismo.</p>
      </header>

      <section className="plans__container--cards">
        {Object.values(plansData).map((plan) => (
          <article
            key={plan.id}
            className={plan.state == "MÁS POPULAR" ? "plans__card--popular" : "plans__card--normal"}
          >
            {plan.state === "MÁS POPULAR" && (
              <p className="plans__ticket--popular">MÁS POPULAR</p>
            )}
            <p className="plans__price">
              <span>
                ${plan.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
              /mes
            </p>

            <h2>{plan.title}</h2>
            <p className="plans__details">{plan.description}</p>

            <ul className="plans__container--items">
              {plan.items.map((item, index) => (
                <li key={index}
                  className={
                  item.status == true ? "plans__item--activo" : "plans__item--inactivo"
                }>
                  {plan.state == "MÁS POPULAR" ? (
                    <img src={IconCheck} className="plans__item--img" alt="Icono de verificación" />
                  ) : (
                    <img src={IconCheckWhite} className="plans__item--img" alt="Icono de verificación" />
                  )}
                  <span className="plans__item--text">
                    {item.item}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={plan.state == "MÁS POPULAR" ? "plans__Button--popular" : ""}
            >
              Elegir plan
            </button>
          </article>
        ))}
      </section>
    </main>
  );
};
