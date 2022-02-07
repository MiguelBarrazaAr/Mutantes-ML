# -*- encoding: utf-8 -*-
import unittest
import requests

class TestEngine(unittest.TestCase):
    """
    Validamos la api
    """
    host = "http://localhost:3000/"
    url=host+"dev/"

    def get(self, root, *args, **kwargs):
        return requests.get(self.url+root, *args, **kwargs)

    def post(self, root, data):
        return requests.post(self.url+root, json=data)

    def delete(self, root, data):
        return requests.delete(self.url+root, json=data)

    def reset(self):
        # resetea la bd del servidor
        return self.delete("reset", {})

    def test_alHacerUnaConsultaConPingRespondeCodigo200(self):
        consulta = self.get("ping/")
        self.assertEquals(consulta.status_code, 200)

    def test_alHacerUnPingRespondePong(self):
        consulta = self.get("ping")
        self.assertEquals(consulta.text, 'pong')

    def test_alResetearDejaLasEstadisticasConSusValoresEnCero(self):
        consulta = self.delete("reset", {})
        self.assertEquals(consulta.status_code, 200)
        consulta = self.get("stats")
        self.assertEquals(consulta.status_code, 200)
        data=consulta.json()
        self.assertEquals(data["count_mutant_dna"], 0)
        self.assertEquals(data["count_human_dna"], 0)
        self.assertEquals(data["ratio"], 0)

    def test_alConsultarPorUnRecursosInexistenteEsError404ResourceNotFound(self):
        consulta = self.delete("inexistente", {})
        self.assertEquals(consulta.status_code, 404)
        consulta = self.post("inexistente", {})
        self.assertEquals(consulta.status_code, 404)
        consulta = self.get("inexistente")
        self.assertEquals(consulta.status_code, 404)

    def test_SiSeConsultaPorUnDnaValidoRespondeCodigo200(self):
        data = {"dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]}
        consulta = self.post("mutant/", data)
        self.assertEquals(consulta.status_code, 200)

    def test_SiSeConsultaPorUnDnaNoValidoRespondeCodigo403(self):
        data = {"dna": ["CTGCTA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]}
        consulta = self.post("mutant/", data)
        self.assertEquals(consulta.status_code, 403)

    def test_SiSeConsultaConUnDnaNoFormateadoCorrectamenteRespondeCodigo400(self):
        data = {"dna": ["CTGCTA","CAGTGC","TTATGT","AGAAGG","CCCCTA"]}
        consulta = self.post("mutant/", data)
        self.assertEquals(consulta.status_code, 400)

        # tiene una letra que no corersponde en la ultima fila, una F
        data2 = {"dna": ["CTGCTA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTF"]}
        consulta2 = self.post("mutant/", data2)
        self.assertEquals(consulta2.status_code, 400)

    def test_SiSeIntentaValidarVariasVecesElMismoAdnSoloContabilizaComoUno(self):
        self.reset()

        # agregamos ADN:
        data = {"dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]}
        consulta = self.post("mutant/", data)
        consulta = self.post("mutant/", data)
        consulta = self.post("mutant/", data)


        consulta = self.get("stats")
        self.assertEquals(consulta.status_code, 200)
        data=consulta.json()
        self.assertEquals(data["count_mutant_dna"], 1)


    def test_AlConsultarLasEstadisticasRetornaCantidadUnicasDeADNValidadosYElRatioDeMutantesFrenteAHumanos(self):
        #self.reset()

        # agregamos mutantes:
        consulta = self.post("mutant/", {"dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]})
        self.assertEquals(consulta.status_code, 200, "mutante 1")
        # estos no se agregan por que son iguales:
        consulta = self.post("mutant/", {"dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]})
        self.assertEquals(consulta.status_code, 200, "mutante 1")
        consulta = self.post("mutant/", {"dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]})
        self.assertEquals(consulta.status_code, 200, "mutante 1")
        # Este mutante es diferente
        consulta = self.post("mutant/", {"dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","GAGGGG"]})
        self.assertEquals(consulta.status_code, 200, "mutante 2")
        consulta = self.post("mutant/", {"dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","GTGGGG"]})
        self.assertEquals(consulta.status_code, 200, "mutante 2")

        # agregamos humanos:
        consulta = self.post("mutant/", {"dna": ["CTGCTA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]})
        self.assertEquals(consulta.status_code, 403, "humano 1")
        consulta = self.post("mutant/", {"dna": ["CTGCTA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTT"]})
        self.assertEquals(consulta.status_code, 403, "humano 2")
        consulta = self.post("mutant/", {"dna": ["CTGCTA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTA"]})
        self.assertEquals(consulta.status_code, 403, "humano 3")
        consulta = self.post("mutant/", {"dna": ["CTGCTA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACCA"]})
        self.assertEquals(consulta.status_code, 403, "humano 4")
        consulta = self.post("mutant/", {"dna": ["CTGCTA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACCG"]})
        self.assertEquals(consulta.status_code, 403, "humano 5")
        consulta = self.post("mutant/", {"dna": ["CTGCTA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCATCG"]})
        self.assertEquals(consulta.status_code, 403, "humano 6")


        consulta = self.get("stats")
        self.assertEquals(consulta.status_code, 200)
        data=consulta.json()

        self.assertEquals(data["count_mutant_dna"], 3)
        self.assertEquals(data["count_human_dna"], 6)
        self.assertEquals(data["ratio"], 0.5)
