import {useRouter} from 'next/router'

function NFTItem() {
  const router = useRouter()
  const id = router.query.nftId
  return (

    <p>Hello from page {id}</p>
  )
}

export default NFTItem