import HeroImage from '../../../public/images/hero-image-02.jpg'
import Image from 'next/image'

export default function ModalVideo(){
  return (
    <div>
      <div>
        <div className="relative flex justify-center items-center" data-aos="fade-up" data-aos-delay="200">
          <Image src={HeroImage} width='900' height='350' alt='Hero-Image' />
        </div>
      </div>
    </div>
  )
}