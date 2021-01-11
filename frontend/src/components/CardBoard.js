import React from 'react'
import "./CardBoard.scss"
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core'
import { useHistory } from "react-router-dom";

export default function CardBoard(props) {
    const { variant, menuList } = props;
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
                variant === "small" ? 
                (
                    menuList.map(menu => (
                        <Card className="card-small-root">
                            <CardActionArea onClick={getLinkHandler(menu.link)}>
                                <CardMedia
                                    image={menu.image}
                                    title={menu.title}
                                    className="card-small-media"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="caption">
                                        {menu.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>)
                        )
                )
                :
                (
                    menuList.map(menu => (
                        <Card className="card-root">
                            <CardActionArea onClick={getLinkHandler(menu.link)}>
                                <CardMedia
                                    image={menu.image}
                                    title={menu.title}
                                    className="card-media"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5">
                                        {menu.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {menu.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>)
                        )
                )
            }
        </div>
    )
}
