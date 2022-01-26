import Image from "../models/Image"

// Dados dos pontos de atendimentos mostrados no Front
export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `http://192.168.0.13:8080/uploads/${image.path}`
        }
    },
    renderMany(images: Image[]) {
        return images.map( image => this.render(image))
    }
}