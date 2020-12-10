import React, { useRef, useState } from 'react'
import "./CardBoard.scss"
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import { useHistory } from "react-router-dom";

export default function CardBoard(props) {
    const { menuList } = props;
    const history = useHistory();

    function getLinkHandler(url) {
        return () => {
            if (url[0] === '/')
                history.push(url);
            else
                window.location.href = url;
        }
    }

    return (
        <div className="card-layout">
            {
                menuList.map(menu => (
                    <Card className="card-root">
                        <CardActionArea onClick={getLinkHandler(menu.link)}>
                            <CardMedia
                                image={menu.image}
                                title={menu.title}
                                className="card-media"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {menu.title}
                                </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {menu.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))
            }
        </div>
    )
}
