

type Props = {
    params: {
        searchTerm: string
    }
}

export default function page({ params: { searchTerm }}: Props) {
  return (
    <div>page</div>
  )
}