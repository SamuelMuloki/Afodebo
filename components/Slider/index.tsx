import { Grid } from "@material-ui/core"
import * as React from "react"
import { default as Slider, Settings } from "react-slick"

const settings: Settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
}

export interface ImageSliderProps {}

const ImageSlider = ({  }: ImageSliderProps) => {
  return (
    <React.Fragment>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <div className="image-slider">
            <Slider {...settings}>
              <div>
                <h3>1</h3>
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
              <div>
                <h3>5</h3>
              </div>
              <div>
                <h3>6</h3>
              </div>
              <div>
                <h3>7</h3>
              </div>
              <div>
                <h3>1</h3>
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
              <div>
                <h3>5</h3>
              </div>
              <div>
                <h3>6</h3>
              </div>
              <div>
                <h3>7</h3>
              </div>
            </Slider>
          </div>
        </Grid>
      </Grid>
      <style jsx>
        {`
          .slick-next:before,
          .slick-prev:before {
            color: #000;
          }
          .image-slider {
            margin: 10px;
          }
        `}
      </style>
    </React.Fragment>
  )
}

export default ImageSlider
