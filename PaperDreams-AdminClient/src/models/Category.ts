export default class Category {
    constructor(
        public id: number,
        public name: string,
        public createdAt: Date,
        public updatedAt: Date,
        public description: string,
        public userId: number,
    ) { }
}