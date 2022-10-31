
import { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./db.sqlite',
    },
  },
});

const favorites = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (session && req.method === "PUT") {
    
    prisma.user.update({
      where: { id: session.user?.id },
      data: { favorites: JSON.parse(req.body).favoriteList}
    }).catch(error => {
      console.log(error);
      
    });
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    });
  } 
  else if (session && req.method === "GET") {
    const result = await prisma.user.findUnique({
      where: { id: session.user?.id },
      select: {
        favorites: true,
      }
    });
    res.send(result);
  }
  else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
};

export default favorites;
