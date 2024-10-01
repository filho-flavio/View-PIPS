import '../../src/App.css'
import Content from '../layout/Content/Content';
import Sidebar from '../layout/Sidebar/Sidebar'

function Home() {
  return (
    <>
      <div className='app-home line'>
        <Sidebar />
        <Content />
      </div>
    </>
  )
}

export default Home