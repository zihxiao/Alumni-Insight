import React, { Component } from "react";
import RatingComponent from "./RatingComponent.jsx";
export default class extends Component {
  constructor() {
    super();

    this.state = {
      rating: 1,
      rating_custom_icon: 6,
      rating_half_star: 3.5,
      rating_empty_initial: 0
    };
  }

  onStarClickHalfStar(nextValue, prevValue, name, e) {
    const xPos =
      (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;

    if (xPos <= 0.5) {
      nextValue -= 0.5;
    }

    this.setState({ rating_half_star: nextValue });
  }

  render() {
    const halfStar = {
      onStarClick: this.onStarClickHalfStar.bind(this),
      renderStarIcon: (index, value) => {
        return (
          <span>
            <i className={index <= value ? "fas fa-star" : "far fa-star"} />
          </span>
        );
      },
      renderStarIconHalf: () => {
        return (
          <span>
            <span style={{ position: "absolute" }}>
              <i className="far fa-star" />
            </span>
            <span>
              <i className="fas fa-star-half" />
            </span>
          </span>
        );
      }
    };

    return (
      <section>
        <h3>I rate my school:</h3>
        <div style={{ fontSize: 24 }}>
          <RatingComponent name="app1" /> 
        </div>
      </section>
    );
  }
}
