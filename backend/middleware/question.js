import jwt from 'jsonwebtoken';

const key = process.env.JWT_SECRET;

export const checkToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, key);
        if (!decoded) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
