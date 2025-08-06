import type React from "react"
import type { AuthFormProps } from '../../Types'

const AuthForm: React.FC<AuthFormProps> = ({title, fields, onSubmit, buttonText, googlebtn, register, errors }) => { 
  return (
    <div className=" bg-white px-4 py-10 rounded-lg w-sm shadow-md border-t-6 border-gray-300">
      <form onSubmit={onSubmit}> 
        <h2 className=" text-lg font-bold mb-2">{title}</h2>
        {fields.map((fields, index)=> ( 
          <div key={index} className=" flex flex-col">
            <label className=" text-gray-500 text-sm -tracking-tighter ">{fields.label}</label> 
            <input 
              type={fields.type}
              {...register(fields.name)}
              placeholder={fields.placeholder}
              required={fields.required}
              className=" py-1 px-2 outline-none border border-gray-300 rounded-md mb-3"
            /> 
            {errors?.[fields.name] && (
              <p className="text-sm text-red-500">
                {errors[fields.name]?.message as string}
              </p>
            )}
          </div>
        ))} 
        <div>
          <p className="text-center text-gray-400">——— or ———</p>
          {googlebtn}
        </div>
        <button type="submit" className=" w-full py-2 px-12 border-none bg-blue-600 text-white mt-2 cursor-pointer">{buttonText}</button>
      </form> 
    </div> 
  )
}

export default AuthForm