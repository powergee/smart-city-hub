import React from 'react'
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import BusinessIcon from '@material-ui/icons/Business';
import ArchiveIcon from '@material-ui/icons/Archive';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import BookIcon from '@material-ui/icons/Book';
import './LinkBoard.scss'

export default function LinkBoard() {
    return (
        <div className="board-root">
            <div className="board-table">
                <div className="board-row">
                    <div className="board-cell">
                        <div>
                            <AccountBalanceIcon className="board-icon" color="primary"></AccountBalanceIcon>
                            <h3>인문사회연구소사업</h3>
                        </div>
                    </div>
                    <div className="board-cell">
                        <div>
                            <BusinessIcon className="board-icon" color="primary"></BusinessIcon>
                            <h3>인문학국HK사업</h3>
                        </div>
                    </div>
                    <div className="board-cell">
                        <div>
                            <ArchiveIcon className="board-icon" color="primary"></ArchiveIcon>
                            <h3>아카이브</h3>
                        </div>
                    </div>
                </div>
                <div className="board-row">
                    <div className="board-cell">
                        <div>
                            <ImportContactsIcon className="board-icon" color="primary"></ImportContactsIcon>
                            <h3>서울학연구소</h3>
                        </div>
                    </div>
                    <div className="board-cell">
                        <div>
                            <LocationCityIcon className="board-icon" color="primary"></LocationCityIcon>
                            <h3>도시과학연구원</h3>
                        </div>
                    </div>
                    <div className="board-cell">
                        <div>
                            <BookIcon className="board-icon" color="primary"></BookIcon>
                            <h3>한국철학사상연구원</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
