
import {MissionBanner }from '../../components/Produkter/MissionBanner'
import { UdvalgteProdukter } from '../../components/Produkter/UdvalgteProdukter'
import { Donationer } from '../../components/Produkter/Donationer'
import { UdvalgteKategorier } from '../../components/Produkter/UdvalgteKategorie'

export const ForsidePage = () => {

  return(
     <div>
        <UdvalgteProdukter />
        <MissionBanner/>
        <UdvalgteKategorier/>
        <Donationer/>
     </ div>
  )
}


