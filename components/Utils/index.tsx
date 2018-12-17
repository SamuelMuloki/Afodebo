import ArrowBack from "@material-ui/icons/ArrowBackIos"
import ArrowForward from "@material-ui/icons/ArrowForwardIos"
import { Settings } from "react-slick"

export const settings: Settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
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
      slidesToShow: 2,
      slidesToScroll: 2,
      infinite: true,
      dots: true,
    },
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
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
]

function SampleNextArrow(props) {
  const { className, onClick } = props
  return (
    <ArrowForward
      className={className}
      style={{
        fill: "black",
      }}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props) {
  const { className, onClick } = props
  return (
    <ArrowBack
      className={className}
      style={{
        fill: "black",
      }}
      onClick={onClick}
    />
  )
}
