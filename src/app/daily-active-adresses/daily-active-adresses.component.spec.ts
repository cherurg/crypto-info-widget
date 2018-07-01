import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { DailyActiveAdressesComponent } from './daily-active-adresses.component'

describe('UserPollComponent', () => {
  let component: DailyActiveAdressesComponent
  let fixture: ComponentFixture<DailyActiveAdressesComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DailyActiveAdressesComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyActiveAdressesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
