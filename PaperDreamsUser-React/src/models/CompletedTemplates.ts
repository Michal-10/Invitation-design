export class CompletedInvitation {
    constructor(
        public name: string,
        public content: string,
        public eventType: number,
        public imageUrl: string,
        public updatedAt: Date,
        public createdAt: Date
    ) { }
}
