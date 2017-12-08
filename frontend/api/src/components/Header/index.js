import React from 'react'

import { Title} from '../Styled'

export const LOGO = `https://2.downloader.disk.yandex.ru/preview/8ecacba3f84c3cdb61d7bbd56e1ab112c724eaa3fa335701ee35a9ed50837908/inf/E6MjNwuEH7Sc-qES4Qz6DgO9NWj_qod2vdr-xnMXhtG4UR4KQVASsHSKUKeUxkufJa9QOF18_a0Ggcj1vNVFPg%3D%3D?uid=380042660&filename=logo.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&tknv=v2&size=1280x711`
export const CAR = `https://2.downloader.disk.yandex.ru/preview/a708ef85d8f214ef18b5dd388c8c0cf529853bd65c25e5b5f091a04a667997ac/inf/E6MjNwuEH7Sc-qES4Qz6DkIgHwpMiyfPwKD_JKXcIi64sK-CYT5bvlw2i-NKc-V-Ei96AnxQ8XoU2ZsFBrzfxQ%3D%3D?uid=380042660&filename=carve.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&tknv=v2&size=1280x711`

const Header = () => (
  <form>
    <Title> <img src={ LOGO }/> </Title>
    <div className="Header-car">
    <Title><img src={ CAR }/></Title>
    </div>
  </form>
)

// 
export default Header
