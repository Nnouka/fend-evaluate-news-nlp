import { handleSubmit } from "../../client/js/formHandler";

const sample = {
    "agreement": "DISAGREEMENT",
    "confidence": "94",
    "irony": "NONIRONIC",
    "model": "general_en",
    "score_tag": "NEU",
    "sentence_list": [
        {
            "agreement": "AGREEMENT",
            "bop": "y",
            "confidence": "100",
            "endp": "4",
            "inip": "0",
            "score_tag": "NONE",
            "text": "Music"
        }
    ],
    "sentimented_concept_list": [],
    "sentimented_entity_list": [],
    "status": {
        "code": "0",
        "msg": "OK",
        "credits": "1",
        "remaining_credits": "19997"
    },
    "subjectivity": "SUBJECTIVE"
};
const mockNode = {
    append: () => {},
    classList: {
        add: () => {}
    },
    appendChild: () => {}
};
describe("Test form handler", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    beforeEach(() => {
        global.document = {
            querySelector: jest.fn().mockImplementation(() => mockNode),
            createDocumentFragment: jest.fn().mockImplementation(() => mockNode),
            createElement: jest.fn().mockImplementation(() => mockNode)         
        }
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                status:200,
                statusText:"success",
                json: () => {
                    return sample;
                }
            })
        );
    })
    describe('Test handleSubmit', () => {
        it('Should be defined', () => {
            expect(handleSubmit).toBeDefined();
        });
        it('Should query document for url input', () => {
            handleSubmit({ preventDefault: () => {} });
            expect(global.document.querySelector).toHaveBeenCalled();
        });
        it('Should fetch result', () => {
            handleSubmit({ preventDefault: () => {} });
            expect(global.fetch).toHaveBeenCalled();
        });
    })
});