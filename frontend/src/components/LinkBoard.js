import React from 'react'
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import BusinessIcon from '@material-ui/icons/Business';
import ArchiveIcon from '@material-ui/icons/Archive';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import BookIcon from '@material-ui/icons/Book';
import { Paper, ButtonBase, Grid } from '@material-ui/core'
import './LinkBoard.scss'

export default function LinkBoard() {
    return (
        <div className="board-root">
            <div className="board-table">
                <div className="board-row">
                    <div className="board-cell">
                        <Paper>
                            <ButtonBase className="board-button">
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <AccountBalanceIcon className="board-icon" color="primary"></AccountBalanceIcon>
                                    <h4>메뉴 1</h4>
                                </Grid>
                            </ButtonBase>
                        </Paper>
                    </div>
                    <div className="board-cell">
                        <Paper>
                            <ButtonBase className="board-button">
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <BusinessIcon className="board-icon" color="primary"></BusinessIcon>
                                    <h4>메뉴 2</h4>
                                </Grid>
                            </ButtonBase>
                        </Paper>
                    </div>
                    <div className="board-cell">
                        <Paper>
                            <ButtonBase className="board-button">
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <ArchiveIcon className="board-icon" color="primary"></ArchiveIcon>
                                    <h4>메뉴 3</h4>
                                </Grid>
                            </ButtonBase>
                        </Paper>
                    </div>
                </div>
                <div className="board-row">
                    <div className="board-cell">
                        <Paper>
                            <ButtonBase className="board-button">
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <ImportContactsIcon className="board-icon" color="primary"></ImportContactsIcon>
                                    <h4>메뉴 4</h4>
                                </Grid>
                            </ButtonBase>
                        </Paper>
                    </div>
                    <div className="board-cell">
                        <Paper>
                            <ButtonBase className="board-button">
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <LocationCityIcon className="board-icon" color="primary"></LocationCityIcon>
                                    <h4>메뉴 5</h4>
                                </Grid>
                            </ButtonBase>
                        </Paper>
                    </div>
                    <div className="board-cell">
                        <Paper>
                            <ButtonBase className="board-button">
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <BookIcon className="board-icon" color="primary"></BookIcon>
                                    <h4>메뉴 6</h4>
                                </Grid>
                            </ButtonBase>
                        </Paper>
                    </div>
                </div>
            </div>
        </div>
    )
}
