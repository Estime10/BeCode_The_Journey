'use client'
import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"

export default function Search() {
    const [Search, setSearch] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearch('')
        router.push(`/${Search}/`)
    }
  return (
<form className="w-50 flex justify-center md:justify-between" onSubmit={ e => handleSubmit}>
    <input
    type="text"
    value={Search}
    onChange={(e) => setSearch(e.target.value)}
    className="bg-white p-2 w-80 text-xl rounded-xl"
    placeholder="Search..."
    />
    <button className="bg-slate-300 ml-2 p-2 text-xl rounded-xl font-bold">GO</button>
</form>
  )
}

