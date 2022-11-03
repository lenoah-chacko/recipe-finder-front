import SearchByTitle from '../../common/searchByTitle.js/searchByTitle'
import '../../visitor/visitorSearch/visitorSearch.css'

export default function AdminSearch() {
return (
    <div className='height'>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-8 mt-5">
                <div className="search-logo"></div>
                    <SearchByTitle/>
                </div>
            </div>
        </div>
        <div className="doodles"></div>
    </div>
  )
}
