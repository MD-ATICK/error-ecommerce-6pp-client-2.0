import React from 'react'
import './Footer.css'
import { AiOutlineTwitter , AiFillGithub ,AiFillYoutube} from 'react-icons/ai'

function Footer() {
  return (
    <div className='footer-container'> 
        <div className="footer-content">
        <div className="text-center flex justify-center items-center flex-col">
          <img className='footer-img' src="./coding.png" alt="" />
            <h1>Yes , I am <span>Atick</span> </h1>
          <div className="">
            <div className="if-icon flex mt-9 justify-left items-center">
                <AiOutlineTwitter className='f-icon rounded-lg text-2xl text-black bg-slate-50' />
                <p className='pl-4'>twitter@gmail.com</p>
            </div>
            <div className="if-icon flex mt-9 justify-left items-center">
                <AiFillGithub className='f-icon rounded-lg text-2xl text-black bg-slate-50'  />
                <p className='pl-4'>github@gmail.com</p>
            </div>
            <div className="if-icon flex mt-9 justify-left items-center">
                <AiFillYoutube className='f-icon rounded-lg text-2xl text-black bg-slate-50' />
                <p className='pl-4'>youtube@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="footer-place">
            <div className="same pb-9">
              <h3 className='pb-2'>Address</h3>
              <p className='pb-3'>Road -  24/7</p>
              <p>Lichubagan , chandraghona , rundunaia</p>
            </div>
            <div className="same pb-9 ">
              <h3 className='pb-2'>Phone</h3>
              <p className='pb-3'>+880125-154-236</p>
              <p>+880125-6865-53</p>
            </div>
            <div className="same pb-9">
              <h3 className='pb-2'>Email</h3>
              <p className='pb-3'>Muhammadatickvai@gmail.com</p>
              <p>alone@gmail.com</p>
            </div>
        </div>

        <div className="footer-app">
          <h3>Download this app</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium reiciendis, dolores ea perferendis obcaecati cupiditate.</p>
          <div className="footer-btns my-7">
            <div className="f-btn">
              <img className='f-btn-img' src="./google-play.png" alt="" />
              <h2>Google Play</h2>
            </div>
            <div className="f-btn">
              <img className='f-btn-img' src="./app-store.png" alt="" />
              <h2>App Store</h2>
            </div>
          </div>
        </div>
        </div>
        <p className='f-p'>Copyright &copy; 2020 by goverment all developer</p>
    </div>
  )
}

export default Footer