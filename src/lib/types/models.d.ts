import type { ChallengeRead, UploadType, ProofRead, RawProof, Status } from '$lib/types/types.d';

export class ChallengeItem implements ChallengeRead {
    challengeId!: number;
    name!: string;
    description: string | null = null;
    type!: UploadType;
    nbPoints!: number;
    locationName!: string;
    defiAccepte!: boolean;
    isDeleted!: boolean;
    groupName!: string;
    groupUrl!: string | null;
    userName?: string;
    allSucceedGroupNames!: string[];
    isDone?: boolean;
    isPending?: boolean;

    constructor(data: any) {
        Object.assign(this, data);
        this.type = data.type; // Assures it matches UploadType
        this.description = data.description ?? null;
        this.nbPoints = Number(data.nbPoints ?? 0);
        this.allSucceedGroupNames = data.allSucceedGroupNames ?? [];
    }

    get id(): number { return this.challengeId; }
    get points(): number { return this.nbPoints ?? 0; }
    get url(): string | undefined { return this.groupUrl ?? undefined; }
    get alt(): string | undefined { return this.groupName ?? undefined; }
    get text(): string {
        if (this.isDone) return `✔ ${this.name}`;
        if (this.isPending) return `⏳ ${this.name} (En attente)`;
        return this.name;
    }
}

export class ProofItem implements ProofRead {
    proofId!: number;
    type!: UploadType;
    content!: string[];
    date!: Date;
    status!: Status;
    validatorId!: string | null;
    comment!: string | null;
    user!: RawProof['user'];
    challenge!: RawProof['challenge'];
    isOkTVn7?: boolean;

    constructor(data: any) {
        Object.assign(this, data);
        this.content = Array.isArray(data.content) ? data.content : [data.content];
    }

    get id(): number { return this.proofId; }

    get text(): string { return `Défi : ${this.challenge?.name ?? 'Sans nom'}`; }

    get points(): number { return this.challenge?.nbPoints ?? 0; }

    get description(): string | null { return this.challenge?.description ?? null; }

    get url(): string | undefined { return this.challenge?.group?.pictureURL ?? undefined; }

    get alt(): string | undefined { return this.challenge?.group?.name ?? undefined; }
}
