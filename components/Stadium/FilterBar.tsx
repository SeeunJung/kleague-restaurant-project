'use client'

import { flexRowICenter } from "@/styles/customStyle";
import { useState } from "react";

const categories = ['전체', '한식', '양식', '중식', '일식', '분식', '기타'];
const sorting = ['평점순', '거리순', '즐겨찾기순'];

export default function FilterBar(){
  // const [view, setView] = useState<'card' | 'list'>('card');

  return(
    <div className={flexRowICenter('justify-between w-4/5 bg-white rounded-xl shadow-xm')}>
      <div className={flexRowICenter()}>
        <select id='category'
          className="mt-1 px-4 py-2 w-fit text-sm rounded-full bg-white border border-solid border-gray-300 focus:outline-none">
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select id='sort'
          className="mt-1 px-4 py-2 w-fit text-sm rounded-full bg-white border border-solid border-gray-300 focus:outline-none">
          {sorting.map((sort) => (
            <option key={sort} value={sort}>{sort}</option>
          ))}
        </select>
      </div>

      <div className={flexRowICenter()}>
        <button>Card</button>
        <button>List</button>
      </div>
    </div>
  )
}