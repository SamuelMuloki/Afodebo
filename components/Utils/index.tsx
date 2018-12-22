import { Hidden } from "@material-ui/core"
import ArrowBack from "@material-ui/icons/ArrowBackIos"
import ArrowForward from "@material-ui/icons/ArrowForwardIos"
import { Settings } from "react-slick"

export const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 4000,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

export const cardResponsive = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: true,
      dots: true,
    },
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 1,
    },
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
    },
  },
]

function SampleNextArrow(props) {
  const { className, onClick } = props
  return (
    <Hidden smDown implementation="css">
      <ArrowForward
        className={className}
        style={{
          fill: "rgba(0, 0, 0, 0.54)",
          height: "100%",
          opacity: 0.95,
          backgroundColor: "#fff",
          borderLeft: "1px solid #eee",
        }}
        onClick={onClick}
      />
    </Hidden>
  )
}

function SamplePrevArrow(props) {
  const { className, onClick } = props
  return (
    <Hidden smDown implementation="css">
      <ArrowBack
        className={className}
        style={{
          fill: "rgba(0, 0, 0, 0.54)",
          height: "100%",
          opacity: 0.95,
          backgroundColor: "#fff",
          borderRight: "1px solid #eee",
        }}
        onClick={onClick}
      />
    </Hidden>
  )
}
