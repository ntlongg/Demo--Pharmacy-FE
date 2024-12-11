import React from 'react'
import content4 from '../assets/image/content4.png';
import HorizontalProductCard from './HorizontalProductCard';

const CT3 = () => {
  return (
    <div className='pl-5 pr-5 mb-5 flex justify-between'>
        <div className='bg-green-500 rounded-2xl flex '>
        <div>
            <img src={content4} alt='content2' className='pl-3 pt-3 pb-1 h-96'/>
          </div>

          <div>
            <HorizontalProductCard category={"Sốt xuất huyết"}/>
          </div>
        </div>
    </div>
  )
}

export default CT3